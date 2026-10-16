// Layered vector costumes preserve Hestia's original flame artwork underneath.
export function HestiaLook({ id }: { id: string }) {
  const aswang=id.startsWith('aswang-'); const horse=id.includes('tikbalang'); const wings=id.includes('manananggal') || id.includes('diwata') || id.includes('bakunawa');
  const salakot=id.includes('salakot') || id.includes('nuno'); const barong=id.includes('barong'); const bandana=id.includes('katipunero');
  const color=aswang ? (id.includes('kapre') ? '#52332c' : id.includes('sirena') ? '#178c8c' : '#66449b') : barong ? '#fff0d2' : '#bd3e40';
  return <svg viewBox="0 0 160 180" aria-label={`Hestia wearing ${id}`} className="hestia-costume" role="img">
    {wings && <path d="M64 89Q15 40 7 112L31 105 40 130 67 114M96 89Q145 40 153 112L129 105 120 130 93 114" fill={color} stroke="#3d254a" strokeWidth="2"/>}
    <path d={id.includes('saya') || id.includes('terno') ? 'M53 109L107 109 126 162Q80 176 34 162Z' : 'M53 108L107 108 119 136 101 142 99 161 61 161 59 142 41 136Z'} fill={color} stroke="#713925" strokeWidth="2"/>
    <path d="M68 109L80 124 92 109M80 124V159" fill="none" stroke={barong?'#b68f5e':'#f8d894'} strokeWidth="3"/>
    {[132,143,153].map(y=><circle key={y} cx="85" cy={y} r="1.5" fill="#a47f43"/>)}
    {horse && <path d="M51 48L47 14 65 31 93 30 108 13 106 51 114 72Q83 101 55 73Z" fill="#764e37" stroke="#40281c" strokeWidth="2"/>}
    {horse && <><path d="M59 58Q79 48 105 59L107 78 66 83Z" fill="#c38e64"/><circle cx="68" cy="44" r="4" fill="#fff"/><circle cx="95" cy="44" r="4" fill="#fff"/><circle cx="68" cy="44" r="2"/><circle cx="95" cy="44" r="2"/></>}
    {salakot && <><path d="M23 56Q80 -2 137 56Q83 72 23 56Z" fill="#d5aa5b" stroke="#79502e" strokeWidth="3"/><path d="M80 17L47 59M80 17L112 59M80 17V63" stroke="#a77937" fill="none"/></>}
    {bandana && <><path d="M46 41Q80 51 114 41L113 56Q80 66 47 56Z" fill="#b8292e"/><path d="M111 51L136 75 116 72 111 91 101 54Z" fill="#b8292e"/></>}
    {id.includes('tiyanak') && <><path d="M51 47L56 27 67 48M93 48L106 28 110 50" fill="#6c9a4c"/><path d="M67 80L72 90 76 81M85 81L89 90 94 80" fill="#fff"/></>}
    {aswang && !horse && !salakot && !wings && !id.includes('tiyanak') && <path d="M42 56Q43 17 80 13Q117 17 118 56L104 48 94 33 80 47 66 33 56 48Z" fill={color}/>}
    {!aswang && !barong && !bandana && !salakot && <path d="M52 109L36 100 30 118 54 131M108 109L124 100 130 118 106 131" fill={color} stroke="#713925" strokeWidth="2"/>}
  </svg>;
}
