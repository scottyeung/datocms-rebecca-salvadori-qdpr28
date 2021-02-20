import React from 'react'
import ReactTextFormat from 'react-text-format';
import 'twin.macro'

const customLinkDecorator = (
	decoratedHref,
	decoratedText,
	linkTarget
) => {
	return (
		<a
			href={decoratedHref}
			tw="block"
			target={linkTarget}
			rel='noopener'
			className='customLink'
		>
			{decoratedText}
		</a>
	)
}

export default function JobsGrid({jobs, title, noYear = false}) {

	const grouped = !noYear ? Object.values(jobs.nodes.reduce((c,v) => {
			c[v.year] = c[v.year] || [];
			c[v.year].push(v);
			return c;
	}, {})) : null
	
	return (
		<article className="sheet">
		<div tw="border-t-2 border-b-2">{title}</div>
		{
			grouped ? grouped.map((item, idx) => {
				return (
					<div key={idx} tw="pb-20">
						<table key={idx} tw="min-w-full divide-y divide-gray-200">
							<tbody tw="bg-white divide-y divide-gray-200 border-t-2 border-b-2">
						{
							item.map((job, idx) => (
								<tr>
									<td tw="px-3 py-4 whitespace-nowrap">
										<div tw="w-10">
											{idx === 0 && job.year}
										</div>
									</td>
									<td tw="px-3 py-4 whitespace-nowrap">{job.work} {job?.place} {job?.commission}</td>
									<td tw="px-3 py-4 whitespace-nowrap">{job?.country}</td>
								</tr>)
							)
						}
						</tbody>
						</table>
					</div>
				)
			}) :       
			jobs.nodes.map((job, idx) => (
				<p key={idx} tw="pb-5 border-t-2">
				<ReactTextFormat linkDecorator={customLinkDecorator}>
					{job.title}
				</ReactTextFormat>
				</p>
			))
		}
		</article>
	)
}