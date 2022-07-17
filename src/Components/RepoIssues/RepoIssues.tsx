import React, {FC, useState} from "react";
import {gql, useQuery, useMutation} from "@apollo/client";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import IssueItem from "../../common/IssueItem/IssueItem";
import './styles.css';
import AddIssueModal from "./AddIssueModal/AddIssueModal";


const GET_ISSUES = gql`
  query  Issues($owner: String! $name: String! $after: String) {
  repository(owner: $owner name: $name) {
    id
    issues(first:10 after:$after) {
    pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          title
          author {
            login
          }
        }
      }
    }
  }
}
`

const CREATE_ISSUE = gql`
    mutation createIssue($repositoryId : ID!, $title: String!, $body: String) {
      createIssue(input: {repositoryId: $repositoryId, title: $title, body: $body}) {
        issue {
          number
          body
        }
      }
    }
`

type IssueType = {
    node: {
        author: {
            login: string
        },
        id: string,
        title: string
    }
}

const RepoIssues: FC = () => {
    const {owner, name} = useParams();
    const navigate = useNavigate()
    const [createIssue] = useMutation(CREATE_ISSUE, {
        refetchQueries: [
            {query: GET_ISSUES},
            GET_ISSUES
        ],
    });

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {loading, error, data, fetchMore} = useQuery(GET_ISSUES, {
        variables: {owner, name},
    });

    const handleModalOpen = (val: boolean) => {
        setIsModalOpen(val)
    }

    const loadMore = () => {
        const {repository: {issues: {pageInfo: {endCursor}}}} = data;
        const after = endCursor;
        fetchMore({
            variables: {
                after
            },
            updateQuery: (previousResult = {}, {fetchMoreResult = {}}) => {
                const prevRepo = previousResult.repository || {};
                const prevIssues = prevRepo.issues || {};
                const currentRepo = fetchMoreResult.repository || {};
                const currentIssues = currentRepo.issues || {};
                const prevEdges = prevIssues.edges || [];
                const currentEdges = currentIssues.edges || [];
                const result = {
                    ...previousResult,
                    repository: {
                        ...prevRepo,
                        issues: {
                            ...prevIssues,
                            edges: [...prevEdges, ...currentEdges],
                            pageInfo: currentIssues.pageInfo,
                        },
                    }
                }

                return result;
            }
        })
    }

    const handleCreateSubmit = (title: string, body: string) => {
        const repositoryId: string = data.repository.id;
        createIssue({variables: {repositoryId, title, body}}).then(() => handleModalOpen(false))
    }

    if (loading) return <div className='issue-list'>Loading...</div>


    const {repository: {issues: {pageInfo: {hasNextPage}}}} = data;


    return (
        <div className='issue-list-container'>
            <div className='issue-list-header'>
                <button className='home-button' onClick={() => navigate('/')}>
                    Home
                </button>
                <button
                    className='add-new-button'
                    onClick={() => handleModalOpen(true)}
                >
                    New Issue
                </button>
            </div>
            {data.repository.issues.edges.length ? (
                <>
                    <ul className='issue-list'>
                        {
                            data.repository.issues.edges.map((issue: IssueType) => {
                                return <IssueItem key={issue.node.id} issue={issue.node}/>
                            })
                        }
                    </ul>
                    { hasNextPage &&
                        <div>
                            <button className='load-more-button' onClick={loadMore}>Load More</button>
                        </div>
                    }
                    </>)
                : <h1>No Issues to display</h1>
            }
            {isModalOpen &&
                <AddIssueModal
                onClose={() => handleModalOpen(false)}
                isOpen={isModalOpen}
                handleAddIssue={handleCreateSubmit}/>
            }
        </div>
    )
}

export default RepoIssues