export type Coord = {
    lat: number,
    lng: number,
    address: string,
  }
  
export type Icon = {
    prefix: string,
    suffix: string
  }
  
export type Shop = { 
    id: number, 
    name: string, 
    location: Coord,  
    categories?: {icon?: Icon}[]
  }

