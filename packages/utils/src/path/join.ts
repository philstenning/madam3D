
const joinRegex = /(\.*\/+)+|(\.*\\+)+/;
const formatRegex=/(\.*\/+)+/g

export function join(...paths: string[]): string {
    
  const res = [];
  paths.forEach((path) => {
    const text = path.trim().replace(joinRegex, "");
    console.log(text)
    text.length > 0 ? res.push(`/${text}`) : null;
  });
 return res.join('').replace(formatRegex,'/')
  
}


export function format(path:string,keepTrailingSlash=false):string{
   
  if(keepTrailingSlash){
   return  path.replace(formatRegex, "/").toString();
  }
    return  path.replace(formatRegex,'/').replace(/\/$/,'').toString()
   

}