export interface SearchResponse {
  id: number,
  name: string,
}
export interface SearchPractitionerResponse extends SearchResponse {
  city: string,
  url: string
}

export interface SearchSpecialityResponse extends SearchResponse {
  slug: string
}
