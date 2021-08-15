import "./closefreind.css"

export default function CloseFreind({closeFreind}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    return (
        <li className="sidebarFreind">
            <img src={PF+closeFreind.profilePicture} alt="" className="sidebarFreindImage" />
            <span className="sidebarFreindName">{closeFreind.username}</span>
        </li>
    )
}
