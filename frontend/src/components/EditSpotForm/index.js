import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSpot, editSpot } from "../../store/spot";

const EditSpotForm = ({spotId, hideForm}) => {
    const [name, setName] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [description, setDescription] = useState("")
    const [url, setUrl] = useState("")
    const [validationErrors, setValidationErrors] = useState([])
    // const [editOn, setEditOn] = useState(false)
    // const [address, setAddress] = useState("")

    // const sessionUser = useSelector(state => state.session)
    // const id = sessionUser.user.id

    const updateName = e => setName(e.target.value)
    const updateCountry = e => setCountry(e.target.value)
    const updateCity = e => setCity(e.target.value)
    const updateUrl = e => setUrl(e.target.value)
    const updateDescription = e => setDescription(e.target.value)
    // const updateAddress = e => setAddress(e.target.value)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getSpot())
    },[dispatch])

    const onSubmit = async(e) => {
        e.preventDefault();

        const payload = {
            name,
            // country,
            // address,
            description,
        }

        const res = await dispatch(editSpot(spotId, payload))
        hideForm()
        // console.log(res)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <ul></ul>
                <input
                    type='text'
                    placeholder='Name'
                    required
                    value={name}
                    onChange={updateName}
                    />
                {/* <input
                    type='text'
                    placeholder='Country'
                    required
                    value={country}
                    onChange={updateCountry}
                    /> */}
                <input
                    type='text'
                    placeholder='Description'
                    required
                    value={description}
                    onChange={updateDescription}
                    />
                {/* <input
                    type='text'
                    placeholder='Url to Image'
                    required
                    value={url}
                    onChange={updateUrl}
                    /> */}
                <button type='submit'>Submit</button>
                {/* <div>
                    <img src={url} alt="preview"/>
                </div> */}
                    {/* <input
                type='text'
                placeholder='City'
                required
                value={city}
                onChange={updateCity}
                /> */}
            </form>
        </div>
    )
}

export default EditSpotForm