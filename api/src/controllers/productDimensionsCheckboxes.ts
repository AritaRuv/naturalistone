import { RowDataPacket } from "mysql2";

export function productDimensionsCheckboxes(finish:string, size:string, thickness:string,  results:RowDataPacket[]) {
  
  let filteredProds = results
  let errorsSearch = {
    error:''
  }
  
  if(finish !== ''){
    let filteredFinish = filteredProds.filter((e) => e.Finish === finish)
    if(filteredFinish.length === 0) errorsSearch.error = `No match for Size: ${finish}`
    else filteredProds = filteredFinish
  }

  if(thickness !== ''){
    let filteredThickness = filteredProds.filter((e) => e.Thickness === thickness)
    if(filteredThickness.length === 0) errorsSearch.error = `No match for Size: ${thickness}`
    else filteredProds = filteredThickness
  }

  if(size !== ''){
    let filteredSize = filteredProds.filter((e) => e.Size === size)
    if(filteredSize.length === 0) errorsSearch.error = `No match for Size: ${size}`
    else filteredProds = filteredSize
  }
  return filteredProds
} 