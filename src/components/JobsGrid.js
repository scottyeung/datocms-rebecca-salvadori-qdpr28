import React from 'react'
import ReactTextFormat from 'react-text-format';
import tw from 'twin.macro'
import { isMobile } from 'react-device-detect'

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
			tw="sm:mb-3 md:mb-0"
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
						<table key={idx} tw="min-w-full divide-y divide-black md:divide-gray-400 table-fixed">
						<thead>
							<tr tw="opacity-0">
								{!isMobile && <th tw="w-1/12"></th>}
								<th tw="w-1/3 md:w-1/2"></th>
								<th tw="w-1/12"></th>
							</tr>
						</thead>
							<tbody tw="md:bg-white divide-y divide-black md:divide-gray-400 border-t-2 border-b-2">
							{idx === 0 && (<tr tw="border-b border-black md:border-gray-400">
								{
									!isMobile &&
									<td>
										<div tw="w-10">
										</div>
									</td>
								}
								<td tw="py-10 whitespace-pre-wrap px-10">
								{title}
								</td>
								<td></td>
							</tr>)}
						{
							item.map((job, idx) => (
								<tr css={["border-none", idx !== 0 && tw`border-black`]}>
										{
											!isMobile &&
											<td>
											<div tw="w-10">
												{idx === 0 && job.year}
											</div>
											</td>
										}
									<td tw="pb-6 md:pb-0">
										<div>{job.work} {job?.place} {job?.commission} {job?.qualification} </div>
									</td>
									<td tw="align-top md:align-baseline text-right md:text-left">{job?.country} {job?.premiere}</td>
								</tr>)
							)
						}
						</tbody>
						</table>
					</div>
				)
			}) : (
				<>
				<table tw="min-w-full divide-y divide-black md:divide-gray-400 table-fixed">
				<thead>
					<tr tw="opacity-0">
						{!isMobile && <th tw="w-1/12"></th>}
						<th tw="w-1/3 md:w-1/2"></th>
						<th tw="w-1/12 md:w-1/12"></th>
					</tr>
				</thead>
				<tbody tw="md:bg-white divide-y divide-black md:divide-gray-400 border-t-2 border-b-2">
					<tr>
						{
							!isMobile &&
							<td>
								<div tw="w-10">
								</div>
							</td>
						}
						<td tw="py-10 px-10">
						{title}
						</td>
						<td></td>
					</tr>
				{jobs.nodes.map((job, idx) => (
					<tr key={idx}>
					{
						!isMobile &&
						<td>
							<div tw="w-10">
								{idx === 0 && job.year}
							</div>
						</td>
					}
					<td>
						<div tw="pb-6">
						<ReactTextFormat linkDecorator={customLinkDecorator}>
							{job.title}
						</ReactTextFormat>
						</div>
					</td>
					<td tw="align-top text-right md:text-left">{`${job?.year}\nInterview`}</td>
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