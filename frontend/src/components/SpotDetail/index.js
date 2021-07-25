import { NavLink } from 'react-router-dom';

import {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { deleteSpot, getSpotDetail } from '../../store/spot';
import EditSpotForm from '../EditSpotForm';
import AddImageForm from '../AddImageForm';

import './SpotDetail.css'
import { addTrip } from '../../store/trips';

const SpotDetail = () => {
    // const [name, setName] = useState('')
    // const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')


    const [showEditForm, setShowEditForm] = useState(false)
    const [showImageForm, setShowImageForm] = useState(false)
    // const [showDeleteForm, setShowDeleteForm] = useState(false)

    const updateImageUrl = (e) => setImageUrl(e.target.value)

    const {id} = useParams()

    // const spotInfo = useSelector(state => {
    //     return state.spot.find(spot=>{
    //         return spot.list
    //     })
    // })


    const spot = useSelector(state => {
        return state.spot
    })

    const sessionUser = useSelector(state => state.session)
    const sessionUserId = sessionUser?.user?.id

    const spotUserId = spot[id]?.userId
    // console.log("postUserId", spotUserId, "\nsessionId", sessionUserId)

    const postBelongsToUser = spotUserId === sessionUserId


    // console.log("id", id)
    // console.log("spot", spot)
    // console.log("spot.id", spot[id])

    const dispatch = useDispatch()
    const history = useHistory()

    // if (!spot[id]){
    //     history.push('/')
    // }

    // console.log(spot[id].name)
    // useEffect(()=>{
    //     setName(spot[id].name)
    //     setDescription(spot[id].description)
    //     setImage(spot[id].image)
    // }, [spot, id])

    const name = spot[id]?.name
    const description = spot[id]?.description
    let image;
    let images;
    if (spot[id]?.Images){
        images = spot[id]?.Images.map(image => {
            return image;
        })
        if (spot[id]?.Images[0]?.url){
            image = spot[id]?.Images[0]?.url
        }
    } else {
        image = null
    }

    images = images?.map(image => {
       return image.url
    })

    // console.log(images)

    // const images = spot[id]?.Images.map(image => image.url)

    // console.log("image: ", image)
    // console.log("spot: ", spot[id])


    useEffect(() => {
        dispatch(getSpotDetail(id))
    }, [dispatch,id])

    useEffect(()=> {
        if (!spot[id]){
            history.push('/')
        }
    })




    const handleDelete = async e => {
        await dispatch(deleteSpot(id))
        history.push('/spots')

    }

    const handleAddTrip = async e => {
        e.preventDefault()
        const payload = {
            spotId: id,
            userId: sessionUserId,
            startDate: new Date(),
            endDate: new Date(),
        }
        await dispatch(addTrip(payload))
        history.push('/')
    }

    let editContent = null
    let editImageContent = null

    if(showEditForm) {
        editContent = (
            <EditSpotForm spotId={id} hideForm={() => setShowEditForm(false)}/>
        )
    }

    if(showImageForm){
        editImageContent = (
            <AddImageForm spotId={id} hideForm={() => setShowImageForm(false)}/>
        )
    }



    // if(showDeleteForm) {
    //     deleteButton = (
    //         <button className="spot-detail-button spot-detail-delete-button" onClick={handleDelete}>Delete</button>
    //     )
    // }

    return (
        <div className='spot-detail-container'>
            <h1 className="spot-title">{name}</h1>
            <div className='spot-detail-image-container'>
                {images && images.map((image, idx)=>{
                    return (
                        <div className='image-div' key={idx}>
                                <img className='spot-detail-image' src={image} alt={name}/>
                            {/* <div>
                                <button className="spot-detail-button spot-detail-delete-button">Delete</button>
                            </div> */}
                        </div>
                    )
                })}
            </div>
            {/* <a href={image}>
                <img className='spot-detail-image'  src={image} alt={name}/>
            </a> */}
            <p>{description}</p>
            {sessionUserId && (
                <button className="spot-detail-button spot-detail-trips-button" onClick={handleAddTrip}>Add to Trips</button>
            )}
            {/* {deleteButton} */}

            {(!showEditForm && postBelongsToUser) && (
                <button className="spot-detail-button spot-detail-edit-button"  onClick={() => setShowEditForm(true)}>Edit</button>
                )}
            <div>
                {editContent}
            </div>

            {!showImageForm && postBelongsToUser && (
                <button className="spot-detail-button spot-detail-image-button" onClick={()=> setShowImageForm(true)}>Add Image</button>
            )}
            <div>
                {editImageContent}
            </div>

                {postBelongsToUser && (
                    <button className="spot-detail-button spot-detail-delete-button" onClick={handleDelete}>Delete</button>
                )}




        </div>
    )
}

export default SpotDetail
