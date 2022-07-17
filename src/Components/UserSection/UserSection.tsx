import React, {FC} from "react";
import Avatar from "../../common/Avatar/Avatar"
import './styles.css'

import {useQuery, gql} from '@apollo/client';

const GET_VIEWER = gql`
  query {
    viewer {
      login
      avatarUrl
    }
  }
`;

const UserSection:FC = () => {

    const {loading, error, data} = useQuery(GET_VIEWER);

    if (error) return <div>Error :(</div>;

    return (
        <div className='user-section'>
            {!loading ?
            <div className='card'>
                <div className='avatar-container'>
                    <Avatar loading={loading} imgUrl={data.viewer.avatarUrl}/>
                </div>
                <div>
                    <h4>{data?.viewer.login}</h4>
                </div>
            </div> :
            <div>Loading...</div>
        }
        </div>
    )
}

export default UserSection
