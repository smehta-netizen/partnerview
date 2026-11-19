import re, json, html, hashlib, os, sys
from parse import parse, Node
SRC=sys.argv[1]; OUT=sys.argv[2]
raw=open(SRC).read()
tpl=raw[raw.index('<x-dc>'):raw.index('</x-dc>')+len('</x-dc>')]
script=raw[raw.index('<script type="text/x-dc"'):]
script=script[script.index('>')+1:script.rindex('</script>')]
props=json.loads(re.search(r"data-props='([^']*)'",raw).group(1))
root=parse(tpl)
xdc=[k for k in root.kids if isinstance(k,Node)][0]
helmet=[k for k in xdc.kids if isinstance(k,Node) and k.tag=='helmet'][0]
appdiv=[k for k in xdc.kids if isinstance(k,Node) and k.tag!='helmet']
assert len(appdiv)==1; appdiv=appdiv[0]
hstyle=[k for k in helmet.kids if isinstance(k,Node) and k.tag=='style'][0].kids[0]
hlinks=[dict(k.attrs) for k in helmet.kids if isinstance(k,Node) and k.tag=='link']

HOLE=re.compile(r'\{\{([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*)\}\}')
BOOL={'disabled','checked','readOnly','required','multiple','hidden','selected','autoFocus'}
RENAME={'for':'htmlFor','class':'className','readonly':'readOnly','autocomplete':'autoComplete','inputmode':'inputMode','tabindex':'tabIndex','maxlength':'maxLength','minlength':'minLength','colspan':'colSpan','rowspan':'rowSpan','autofocus':'autoFocus','spellcheck':'spellCheck','novalidate':'noValidate','crossorigin':'crossOrigin','srcset':'srcSet','enctype':'encType'}
NOWS={'select','svg','ul','ol','table','thead','tbody','tr','colgroup','path','g'}
classes={}   # decl-string -> name
def camel(p): 
    if p.startswith('--'): return p
    if p.startswith('-'): p=p[1:]; p=p[0].upper()+p[1:] if False else p; parts=p.split('-'); return parts[0].capitalize()+''.join(x.capitalize() for x in parts[1:])
    parts=p.split('-'); return parts[0]+''.join(x.capitalize() for x in parts[1:])
def expr(path, scope):
    segs=path.split('.')
    head=segs[0] if segs[0] in scope else 'v.'+segs[0]
    return head+''.join('?.'+s for s in segs[1:])
def tmpl(s, scope):
    s=html.unescape(s)
    if not HOLE.search(s): return json.dumps(s)
    m=HOLE.fullmatch(s)
    if m: return expr(m.group(1),scope)
    out=''; pos=0
    for m in HOLE.finditer(s):
        out+=s[pos:m.start()].replace('\\','\\\\').replace('`','\\`').replace('${','\\${')+'${'+expr(m.group(1),scope)+' ?? ""}'; pos=m.end()
    out+=s[pos:].replace('\\','\\\\').replace('`','\\`').replace('${','\\${')
    return '`'+out+'`'
def split_decls(st):
    out=[]; depth=0; cur=''
    for ch in st:
        if ch=='(': depth+=1
        if ch==')': depth-=1
        if ch==';' and depth==0: out.append(cur); cur=''
        else: cur+=ch
    out.append(cur)
    res=[]
    for d in out:
        d=d.strip()
        if not d: continue
        i=d.index(':'); res.append((d[:i].strip(), d[i+1:].strip()))
    return res
def style_parts(st, scope):
    decls=split_decls(html.unescape(st)); static=[]; dyn=[]; seen_dyn=False
    for p,val in decls:
        if HOLE.search(val) or seen_dyn: seen_dyn=True; dyn.append((p,val))
        else: static.append((p,val))
    cname=None
    if static:
        key='; '.join(f'{p}: {v}' for p,v in static)
        if key not in classes:
            h=hashlib.sha1(key.encode()).hexdigest()[:6]; classes[key]='s-'+h
        cname=classes[key]
    sobj=None
    if dyn:
        sobj='{ '+', '.join(f'{json.dumps(camel(p)) if p.startswith("--") else camel(p)}: {tmpl(val,scope)}' for p,val in dyn)+' }'
    return cname,sobj

def attrs_jsx(n, scope):
    out=[]; cls=[]; tag=n.tag
    for name,val in n.attrs:
        if name.startswith('hint-'): continue
        if val is None: val=''
        if name=='style':
            c,s=style_parts(val,scope)
            if c: cls.append(json.dumps(c))
            if s: out.append(f'style={{{s}}}')
            continue
        if name=='class':
            cls.append(tmpl(val,scope)); continue
        jn=RENAME.get(name, name if (name.startswith('aria-') or name.startswith('data-') or '-' not in name) else camel(name))
        has=HOLE.search(val)
        if jn in BOOL:
            out.append(f'{jn}={{on({tmpl(val,scope)})}}' if has else f'{jn}={{true}}'); continue
        if jn=='value' and tag in ('input','select','textarea'):
            out.append(f'value={{{tmpl(val,scope)} ?? ""}}'); continue
        if re.fullmatch(r'on[A-Z]\w*',jn):
            out.append(f'{jn}={{{tmpl(val,scope)}}}'); continue
        if jn=='src' and val.startswith('/_blob/'):
            out.append('src={antlerwingLogo}'); continue
        t=tmpl(val,scope)
        out.append(f'{jn}={t}' if t.startswith('"') else f'{jn}={{{t}}}')
    if cls:
        out.insert(0, 'className='+(cls[0] if len(cls)==1 and cls[0].startswith('"') else '{['+', '.join(cls)+'].join(" ")}'))
    return out

comps=[]  # (name, folder, node)
NAMES={'hasTd':('TaskDrawer','panels'),'hasCht':('ChatPanel','panels'),'modalDTime':('DealTaskTimeModal','modals'),'modalTime':('LogTimeModal','modals'),'modalSe':('ChooseSeModal','modals'),'modalStake':('StakeholderModal','modals'),'modalLost':('MarkLostModal','modals'),'modalClose':('CloseWonModal','modals'),'modalReset':('ResetDemoModal','modals'),'modalMember':('TeamMemberModal','modals'),'modalDeal':('NewDealModal','modals'),'modalLead':('NewLeadModal','modals'),'modalCompany':('NewCompanyModal','modals'),'modalContact':('NewContactModal','modals')}
def compname(h):
    if h in NAMES: return NAMES[h]
    if h.startswith('modal'): return (h[5:]+'Modal','modals')
    if h.startswith('is'): return (h[2:]+'Screen','screens')
    return None
BLOCK={'div','p','h1','h2','h3','h4','h5','h6','section','aside','main','nav','header','footer','ul','ol','li','form','table','select','textarea','sc-if','sc-for','svg'}
def is_flex(n):
    st=dict(n.attrs).get('style') or ''
    return re.search(r'(^|;)\s*display:\s*(inline-)?(flex|grid)', st) is not None
def esc_text(t):
    t=html.unescape(t)
    if re.search(r'[{}<>]', t) or t!=t.strip() or '\n' in t: return '{'+json.dumps(t)+'}'
    return t
def text_jsx(s, scope):
    """lead ws / content / trail ws, keeping a single space where HTML would show one"""
    lead=s[:len(s)-len(s.lstrip())]; trail=s[len(s.rstrip()):]; core=s.strip()
    parts=[]
    if lead: parts.append('{" "}')
    pos=0
    for m in HOLE.finditer(core):
        if m.start()>pos: parts.append(esc_text(core[pos:m.start()]))
        parts.append('{'+expr(m.group(1),scope)+'}'); pos=m.end()
    if pos<len(core): parts.append(esc_text(core[pos:]))
    if trail: parts.append('{" "}')
    return ''.join(parts)
def render(n, scope, ind, parent_tag, top=False):
    """return list of lines"""
    pad='  '*ind; L=[]
    kids=n.kids
    for ki,k in enumerate(kids):
        if isinstance(k,str):
            if not k.strip():
                if parent_tag in NOWS or getattr(n,'_flex',False): continue
                prev=kids[ki-1] if ki>0 else None; nxt=kids[ki+1] if ki+1<len(kids) else None
                blk=lambda x: x is None or (isinstance(x,Node) and x.tag in BLOCK)
                if blk(prev) and blk(nxt): continue
                L.append(pad+'{" "}'); continue
            L.append(pad+text_jsx(k,scope)); continue
        if k.tag in ('sc-if','sc-for'): k._flex=getattr(n,'_flex',False)
        if k.tag=='sc-if':
            v=dict(k.attrs)['value']; m=HOLE.fullmatch(v); e=expr(m.group(1),scope)
            cn=compname(m.group(1)) if (top and '.' not in m.group(1)) else None
            if cn and not scope:
                comps.append((cn[0],cn[1],k))
                L.append(f'{pad}{{on({e}) && <{cn[0]} v={{v}} />}}')
            else:
                L.append(f'{pad}{{on({e}) && (<>')
                L+=render(k,scope,ind+1,parent_tag,top)
                L.append(f'{pad}</>)}}')
            continue
        if k.tag=='sc-for':
            av=dict(k.attrs); m=HOLE.fullmatch(av['list']); var=av['as']
            idx='i'+str(len(scope))
            L.append(f'{pad}{{list({expr(m.group(1),scope)}).map(({var}, {idx}) => (<React.Fragment key={{{idx}}}>')
            L+=render(k,scope|{var},ind+1,parent_tag,False)
            L.append(f'{pad}</React.Fragment>))}}')
            continue
        at=attrs_jsx(k,scope)
        open_='<'+k.tag+(' '+' '.join(at) if at else '')
        if k.tag in ('input','br','img','hr','meta','link') :
            L.append(pad+open_+' />'); continue
        if k.tag=='textarea':
            L.append(pad+open_+' />'); continue
        k._flex=is_flex(k) or getattr(n,'_flex',False) and k.tag in ('sc-if','sc-for')
        if all(isinstance(x,str) for x in k.kids) and k.kids and len(''.join(k.kids))<160 and '\n' not in ''.join(k.kids).strip():
            L.append(pad+open_+'>'+text_jsx(''.join(k.kids),scope)+'</'+k.tag+'>'); continue
        inner=render(k,scope,ind+1,k.tag,top and k.tag in ('div','main','section'))
        if not inner: L.append(pad+open_+'></'+k.tag+'>')
        else: L.append(pad+open_+'>'); L+=inner; L.append(pad+'</'+k.tag+'>')
    return L

HEADER='''// Generated from the PartnerView design-canvas prototype. Edit freely.
import React from 'react';
import {{ on, list }} from '{rt}';
{imports}
'''
def write_comp(path, name, body_lines, imports, rt):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path,'w') as f:
        f.write(HEADER.format(rt=rt, imports=imports))
        f.write(f'\nexport default function {name}({{ v }}) {{\n  return (\n    <>\n')
        f.write('\n'.join('    '+l for l in body_lines))
        f.write('\n    </>\n  );\n}\n')

# app shell
shell=Node('#frag',[],0); shell.kids=[appdiv]
app_lines=render(shell,frozenset(),1,'#root',True)
# components (processing may add nested comps; loop until done)
done=0; outs=[]
while done<len(comps):
    name,folder,node=comps[done]; done+=1
    lines=render(node,frozenset(),1,'div',False)
    outs.append((name,folder,lines))
imp="import antlerwingLogo from '../assets/antlerwing-logo.png';\n"+'\n'.join(f"import {n} from './{f}/{n}';" for n,f,_ in outs)
write_comp(f'{OUT}/src/views/AppView.jsx','AppView',app_lines,imp,'./runtime')
for n,f,lines in outs:
    write_comp(f'{OUT}/src/views/{f}/{n}.jsx',n,lines,'','../runtime')
# css
with open(f'{OUT}/src/styles/app.css','w') as f:
    f.write('/* Global styles (from the prototype <helmet>) */\n'+hstyle.strip()+'\n\n/* Static styles extracted from the prototype markup. Dynamic values stay inline in the JSX. */\n')
    for key,cn in sorted(classes.items(), key=lambda x:x[1]):
        f.write(f'.{cn} {{ {key}; }}\n')
# logic
logic=script.strip()
assert logic.startswith('class Component extends DCLogic {')
logic=logic.replace('class Component extends DCLogic {','export default class PartnerViewLogic extends DCLogic {',1)
with open(f'{OUT}/src/logic/PartnerViewLogic.js','w') as f:
    f.write("// All app state, seed data, permissions and the renderVals() view-model.\n// Ported unchanged from the design-canvas prototype; DCLogic is React.Component.\nimport DCLogic from './DCLogic';\n\n"+logic+'\n')
json.dump({'props':{k:v['default'] for k,v in props.items() if not k.startswith('$')}, 'links':hlinks, 'classes':len(classes), 'comps':[(n,f) for n,f,_ in outs]}, open(f'{OUT}/meta.json','w'), indent=1)
print(len(classes),'classes;',len(outs),'components')
