/* eslint @next/next/no-page-custom-font: 0 */
import { NextApiRequest, NextApiResponse } from 'next';

export default async function authorize(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  res.status(200).json({
    cart_token: 'cartToken',
  });
}
