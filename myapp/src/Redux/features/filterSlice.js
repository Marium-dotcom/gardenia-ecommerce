import { createSlice } from '@reduxjs/toolkit'

const initialState = {
filteredProduct : [],
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action){

        const {productz,search} = action.payload
        let afterfilter = productz.filter((e)=> e.name.toLowerCase().includes(search.toLowerCase()))

        state.filteredProduct = afterfilter

    },
    FILTER_BY_SORT(state, action){
const {productz,sort} = action.payload

    let afterfilter = []

    if (sort === 'Latest'){
      afterfilter = productz
    }

    if (sort === 'Lowest Price'){
      afterfilter = productz.slice().sort((a,b)=> {
        return( a.price - b.price)
      })
    }


    if (sort === 'Highest Price'){
      afterfilter = productz.slice().sort((a,b)=> {
        return( b.price - a.price)
      })
    }

    
    state.filteredProduct = afterfilter

    },

    FILTER_BY_CATEGORY(state, action){
      const {productz,category} = action.payload
      let afterfilter = []
      if (category === 'All Products'){
       afterfilter = productz
      }
      if(category === 'OutDoor'){
        afterfilter =  productz.filter((p)=> p.category === 'OutDoor')
      }
      if(category === 'Indoor'){
        afterfilter =  productz.filter((p)=> p.category === 'Indoor')
      }
      if(category === 'Trees'){
        afterfilter =  productz.filter((p)=> p.category === 'Trees')
      }
      if(category === 'Potsandothers'){
        afterfilter =  productz.filter((p)=> p.category === 'Potsandothers')
      }
      
      
      state.filteredProduct = afterfilter

    }
  }
});

export const {FILTER_BY_SEARCH, FILTER_BY_SORT,FILTER_BY_CATEGORY} = filterSlice.actions

export const selectFilter = (state) => state.filter.filteredProduct

export default filterSlice.reducer