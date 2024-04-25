
export const fetchAttendees = async (page?: number, query?: string) => {
  const url = new URL("http://localhost:3333/events/3371a6e7-e26a-4a6d-9393-ba412dcec40b/attendees")
  
  url.searchParams.set("pageIndex", String(page))

  if(query!.length > 0) {
    url.searchParams.set("query", query!)
  }
 
  const response = await fetch(url)
  const data = await response.json()

  return data
}