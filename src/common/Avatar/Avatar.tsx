import React, {FC} from "react";
// @ts-ignore
import { Avatar } from 'gitstar-components';


type AvatarProps = {
    imgUrl : string
    loading: boolean
}

const UserAvatar: FC<AvatarProps> = ({imgUrl, loading}) => {
    if (loading) return <div>Loading...</div>;
    if (!imgUrl) return <div>Error :(</div>;
    return <Avatar url={imgUrl}/>;
}

export default UserAvatar;