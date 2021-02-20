import React from 'react'

export default function JobsGrid({jobs, title}) {
    const grouped = Object.values(jobs.nodes.reduce((c,v) => {
        c[v.year] = c[v.year] || [];
        c[v.year].push(v);
        return c;
    }, {}))
    
    return (
        <article className="sheet">
        <div>{title}</div>
        {
            grouped.map((item, idx) => {
                return (
                    <div key={idx} style={{paddingBottom: '20px'}}>
                        {
                            item.map((job, idx) => (
                                <div key={idx} style={{display: 'flex', justifyContent: "space-between"}}>
                                    <span>{idx === 0 && job.year}</span>
                                    <span>{job.work}</span>
                                    <span>{job?.place}</span>
                                    <span>{job?.commission}</span>
                                    <span>{job?.country}</span>
                                </div>
                                )
                            )
                        }
                    </div>
                )
            })
        }
        </article>
    )
}