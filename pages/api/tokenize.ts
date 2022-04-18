// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import jsTokens from 'js-tokens'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body)
  res.status(200).json({ tokens: Array.from(jsTokens(req.body.input), (token) => token.value + " - " + token.type).filter((e) => !e.startsWith(" ")).join("|") })
}
