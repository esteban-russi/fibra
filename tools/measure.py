import json, re, sys
from PIL import Image
OUT='/Users/esteban.guerrerorussi/.claude/jobs/92448473/tmp/shots'
im=Image.open(OUT+'/atlas-ground.png').convert('RGB')
boxes=json.load(open(OUT+'/bandboxes.json'))
def g2l(v):
    v/=255.0
    return v/12.92 if v<=0.04045 else ((v+0.055)/1.055)**2.4
def lum(c): return 0.2126*g2l(c[0])+0.7152*g2l(c[1])+0.0722*g2l(c[2])
fails=0
for b in boxes:
    if b['y']<0 or b['y']>=im.height: continue
    m=[float(x) for x in re.findall(r'[-\d.]+', b['colour'])]
    if b['colour'].startswith('rgb'):
        cr,cg,cb=m[0],m[1],m[2]; ca=m[3] if len(m)>3 else 1.0
    else:
        cr=cg=cb=255.0; ca=m[3] if len(m)>3 else 1.0
    worst=1e9; wpx=None
    for y in range(max(0,b['y']), min(b['y']+b['h'], im.height)):
        for x in range(max(0,b['x']), min(b['x']+b['w'], im.width)):
            R,G,B=im.getpixel((x,y))
            fr=cr*ca+R*(1-ca); fg=cg*ca+G*(1-ca); fb=cb*ca+B*(1-ca)
            L1=lum((fr,fg,fb)); L2=lum((R,G,B))
            r=(max(L1,L2)+0.05)/(min(L1,L2)+0.05)
            if r<worst: worst=r; wpx=(R,G,B)
    if wpx is None: continue
    need = 3.0 if b['size']>=24 else 4.5
    flag='OK  ' if worst>=need else 'FAIL'
    if flag=='FAIL': fails+=1
    print(f"  {flag} {worst:5.2f} (need {need})  {b['size']:.0f}px  \"{b['text']}\"  ground rgb{wpx}")
print('\nfailures:', fails)
