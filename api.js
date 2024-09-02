import createClient from "./sanity";

let sanityQuery = (query, params) => createClient.fetch(query, params)

export const getFeateuredRestaurant = () => {
    return sanityQuery(`
        *[_type=='featured' ]{
            ...,
            restaurants[]->{
                ...,
                dishes[]->{
                    ...
                },
                type->{name}
            }
        }
    `)
}

export const getCategories = () => {
    return sanityQuery(`
        *[_type=='category']
    `)
}

export const getFeateuredRestaurantById = (id) => {
    return sanityQuery(`
         *[_type=='featured' && _id==$id]{
                ...,
                restaurants[]->{
                    ...,
                    dishes[]->{
                        ...
                    },
                    type->{name}
                }
            },[0]
    `, {id})
}