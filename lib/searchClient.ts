import { meilisearchClient } from '@/lib/meilisearch'

const index = meilisearchClient.getIndex('hadis')

export async function getHadis(
  textSearch: string,
  currentPage: number,
  filter?: string,
): Promise<any> {
  // console.log(filter)
  const search = await index.search(textSearch, {
    filter: filter,
    attributesToHighlight: ['*'],
    highlightPreTag: '**',
    highlightPostTag: '**',
    hitsPerPage: 20,
    page: currentPage,
    facets: ['status', 'reff'],
  })
  // console.log(search)
  return search
}

export async function getHadisFacets(
  textSearch: string,
  facetName: string,
): Promise<any> {
  const search = await index.searchForFacetValues({
    facetQuery: textSearch,
    facetName: facetName,
  })
  return search
}
export async function getDocDetails(): Promise<any> {
  // textSearch: string,
  // facetName: string
  const search = await index.getDocuments({
    // fields: '*',
    // facetName: facetName,
  })
  return search
}

// export const revalidate = 0 // revalidate the data at most every hour

// export const getItem = cache(async (textSearch: string) => {
//   const index = meilisearchClient.getIndex('hadis')
//   const search = await index.search(textSearch, {
//     // filter: 'status=palsu',
//     // attributesToHighlight: ['*'],
//     facets: ['status', 'reff'],
//   })
//   return search
// })
