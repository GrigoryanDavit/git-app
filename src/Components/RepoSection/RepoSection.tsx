import React, {FC} from 'react'
import RepoCard from '../../common/RepoCard/RepoCard'
import './styles.css'
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

const GET_REPOSITORIES = gql`
   query ($after: String){
     viewer {
      repositories(first:10 after:$after ownerAffiliations:OWNER) {
      pageInfo {
          endCursor
          hasNextPage
        }
         nodes {
            nameWithOwner
            id
            description
            name
        }
      }
     }
    }
`;

type RepoType = {
    description: string | null;
    id: string;
    name: string;
    nameWithOwner: string;
}

const RepoSection: FC = () => {

    const {loading, error, data, fetchMore} = useQuery(GET_REPOSITORIES);

    if (error) return <div className='repositories-section'><h2>Error :(</h2></div>

    const loadMore = () => {
        const {repositories: {pageInfo: {endCursor}}} = data.viewer;
        const after = endCursor;
        fetchMore({
            variables: {
                after
            },
            updateQuery: (previousResult = {}, {fetchMoreResult = {}}) => {
                const prevRepositories = previousResult.viewer.repositories || {};
                const currentRepositories = fetchMoreResult.viewer.repositories || {};
                const prevNodes = prevRepositories.nodes || [];
                const currentNodes = currentRepositories.nodes || [];
                const result = {
                    ...previousResult,
                    viewer: {
                        repositories: {
                            ...prevRepositories,
                            nodes: [...prevNodes, ...currentNodes],
                            pageInfo: currentRepositories.pageInfo,
                        },
                    }
                }

                return result;
            }
        })
    }

    if (loading) return <div className='repository-list-container'><h4>Loading...</h4></div>

    const {repositories: {pageInfo: {hasNextPage}}} = data.viewer

    return (
        <div className='repositories-section'>
            <div className='repository-list-container'>
                {data.viewer.repositories.nodes?.map((repo: RepoType) => {
                        return (
                            <Link  id='item' key={repo.id} to={`${repo.nameWithOwner}/issues`}>
                                <RepoCard repo={repo}/>
                            </Link>
                        )
                    })}
            </div>
            {hasNextPage && <div className='button-container'>
                <button className='load-more-button' onClick={loadMore}>Load More</button>
            </div>}
        </div>
    )
}

export default RepoSection;