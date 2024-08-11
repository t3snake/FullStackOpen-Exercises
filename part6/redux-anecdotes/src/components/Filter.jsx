import { useDispatch } from 'react-redux'
import { filterList } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
      const filterText = event.target.value
      dispatch(filterList(filterText))
    }

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
}

export default Filter