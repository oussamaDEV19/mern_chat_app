import "./share.css"
import {PermMedia, Label , Room, EmojiEmotions, Cancel} from "@material-ui/icons"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";

export default function Share() {

    const {user} = useContext(AuthContext);
    const desc = useRef()
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [file, setFile] = useState(null)


    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if(file){

            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;

            try{
                await axios.post("/upload" , data);
            }catch(err){
                console.log(err)
            }
        }


        try{
            axios.post("/posts", newPost)
            window.location.reload();
        }catch(err){}
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="shareProfileImg" />
                    <input 
                        className="shareInput" 
                        ref={desc}
                        placeholder={"What's in your mind "+ user.username + " ?"} />
                </div>
                <hr className="shareHr" />
                {file && (
                <div className="shareImgContainer">
                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                    <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler} >
                    <label htmlFor="file" className="shareOptions">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Photo or Vedio</span>
                        <input
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>
                    <div className="shareOptions">
                        <Label htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOptions">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOptions">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                    <button className="shareButton" type="submit" >Share</button>
                    
                </form>
            </div>
        </div>
    )
}
