import React, {FC} from 'react';
import './styles.css'

type IssueItemProps = {
    issue: {
        author: {
            login: string
        },
        id: string,
        title: string
    }
}

const IssueItem:FC<IssueItemProps> = ({issue}) => {
    return (
        <li key={issue.id} className='issue-item'>
            <span>
                {issue.title} by {issue.author.login}
            </span>
        </li>
    )
}

export default IssueItem;