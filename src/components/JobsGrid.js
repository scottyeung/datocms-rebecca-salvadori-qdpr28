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
		{
			grouped ? grouped.reverse().map((item, idx) => {
				return (
					<div key={idx} tw="pb-2">
						<table key={idx} tw="min-w-full divide-y divide-gray-400 table-fixed">
						<thead>
							<tr tw="opacity-0">
								<th tw="w-1/12"></th>
								<th tw="w-1/2"></th>
								<th tw="w-1/12"></th>
							</tr>
						</thead>
							<tbody tw="bg-white divide-y divide-gray-400 border-t-2 border-b-2">
							{idx === 0 && (<tr tw="border-b border-gray-400">
								<td>
									<div tw="w-10">
									</div>
								</td>
								<td tw="py-10 whitespace-pre-wrap">
								{title}
								</td>
								<td></td>
							</tr>)}
						{
							item.map((job, idx) => (
								<tr tw="border-none">
									<td>
										<div tw="w-10">
											{idx === 0 && job.year}
										</div>
									</td>
									<td>
										<div>{job.work} {job?.place} {job?.commission} {job?.qualification} </div>
									</td>
									<td>{job?.country} {job?.premiere}</td>
								</tr>)
							)
						}
						</tbody>
						</table>
					</div>
				)
			}) : (
				<>
				<table tw="min-w-full divide-y divide-gray-400 table-fixed">
				<thead>
					<tr tw="opacity-0">
						<th tw="w-1/12"></th>
						<th tw="w-1/2"></th>
						<th tw="w-1/12"></th>
					</tr>
				</thead>
				<tbody tw="bg-white divide-y divide-gray-400 border-t-2 border-b-2">
					<tr>
						<td>
							<div tw="w-10">
							</div>
						</td>
						<td tw="py-10">
						{title}
						</td>
						<td></td>
					</tr>
				{jobs.nodes.map((job, idx) => (
					<tr>
					<td>
						<div tw="w-10">
							{idx === 0 && job.year}
						</div>
					</td>
					<td>
						<div>
						<ReactTextFormat linkDecorator={customLinkDecorator}>
							{job.title}
						</ReactTextFormat>
						</div>
					</td>
					<td></td>
				</tr>
				))}
				</tbody>
				</table>
				</>
			)
		}
		</article>
	)
}