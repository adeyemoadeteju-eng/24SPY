export default async function handler(req, res) {
  try {
    const upstream = await fetch('https://24data.ptfs.app/api/controllers');

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: `Upstream error: ${upstream.status}` });
      return;
    }

    const data = await upstream.json();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate=15');
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch upstream data' });
  }
}
