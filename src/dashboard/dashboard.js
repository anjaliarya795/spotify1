import { fetchRequest } from "../api";
import { ENDPOINT, getItemFromLocalStorage, LOADED_TRACKS, logout, NOW_PLAYING, SECTIONTYPE, setItemInLocalStorage } from "../common";
let displayName;
const audio = new Audio();
const onProfileClick = (event) => {
    event.stopPropagation();
    const profileMenu = document.querySelector("#profile-menu");
    profileMenu.classList.toggle("hidden");
    if (!profileMenu.classList.contains("hidden")) {
        profileMenu.querySelector("li#logout").addEventListener("click", logout)
    }
}

const loadUserProfile = () => {
    return new Promise(async (resolve, reject) => {
        const defaultImage = document.querySelector("#default-image");
        const profileButton = document.querySelector("#user-profile-btn");
        const displayNameElement = document.querySelector("#display-name")

        const { display_name: displayName, images } = await fetchRequest(ENDPOINT.userInfo);

        if (images?.length) {
            defaultImage.classList.add("hidden");
        } else {
            defaultImage.classList.remove("hidden")
        }

        profileButton.addEventListener("click", onProfileClick)
        displayNameElement.textContent = displayName;
        resolve({ displayName, images });
    })
}