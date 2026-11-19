import re, sys, json
VOID={'input','br','img','meta','link','hr','source','area','col','wbr'}
TAG=re.compile(r'<(/?)([a-zA-Z][a-zA-Z0-9-]*)((?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|\'[^\']*\'|[^\s>]+))?)*)\s*(/?)>', re.S)
ATTR=re.compile(r'([^\s=>/]+)(?:\s*=\s*(?:"([^"]*)"|\'([^\']*)\'|([^\s>]+)))?')
class Node:
    def __init__(s,tag,attrs,line): s.tag=tag; s.attrs=attrs; s.kids=[]; s.line=line; s.end=line
def parse(src):
    root=Node('#root',[],1); st=[root]; pos=0
    def lineat(i): return src.count('\n',0,i)+1
    for m in TAG.finditer(src):
        if m.start()>pos: st[-1].kids.append(src[pos:m.start()])
        pos=m.end(); close,tag,attrs,selfc=m.group(1),m.group(2),m.group(3),m.group(4)
        if close:
            assert st[-1].tag==tag,(tag,st[-1].tag,lineat(m.start()))
            st[-1].end=lineat(m.start()); st.pop(); continue
        al=[]
        for a in ATTR.finditer(attrs):
            v=a.group(2) if a.group(2) is not None else a.group(3) if a.group(3) is not None else a.group(4)
            al.append((a.group(1),v))
        n=Node(tag,al,lineat(m.start())); st[-1].kids.append(n)
        if tag.lower() in VOID or selfc: n.end=n.line; continue
        st.append(n)
    if pos<len(src): st[-1].kids.append(src[pos:])
    assert len(st)==1, [x.tag for x in st]
    return root
if __name__=='__main__':
    src=open(sys.argv[1]).read(); r=parse(src)
    def walk(n,d,inloop):
        for k in n.kids:
            if isinstance(k,str): continue
            av=dict(k.attrs)
            if k.tag=='sc-if' and not inloop and re.fullmatch(r'\{\{[A-Za-z_]\w*\}\}',av.get('value','')) and k.end-k.line>40:
                print('  '*d+f'{k.tag} {av["value"]} lines {k.line}-{k.end} ({k.end-k.line})')
            walk(k,d+(1 if k.tag=='sc-if' else 0),inloop or k.tag=='sc-for')
    walk(r,0,False)
