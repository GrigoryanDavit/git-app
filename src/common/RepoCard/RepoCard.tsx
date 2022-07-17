import React, {FC} from 'react';
import './styles.css'

type RepoCardProps = {
     repo:{
         id: string,
         name: string,
         description: string | null
     }
}

const RepoCard: FC<RepoCardProps> = ({repo}) => {
    return (
        <div className='repository-card'>
            <h5>{repo.name}</h5>
            <p>{repo.description ? repo.description : "No Description :("}</p>
        </div>
    )
}

export default RepoCard;