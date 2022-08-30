const HomePage = () => {
  return (
    <>
      <h1>Testing upsertQueryData</h1>

      <ol>
        <li>
          Go to{' '}
          <a href="/__c__asdfghjkl12345" target="_blank">
            /__c__asdfghjkl12345
          </a>
        </li>
        <li>
          Notice how there are some calls to /api/authorize (there should only
          be one but I couldn't be bothered to fix it for this demo unless it's
          actually necessary)
        </li>
        <li>Notice the call to /api/carts/__c__asdfghjkl12345.</li>
        <li>Notice a SECOND call to /api/carts/cartToken.</li>
        <li>
          Notice in the API tab of the Redux Devtools that there is already an
          entry for /api/carts/cartToken added after the first call that is
          propagated as the fastest entry.
        </li>
      </ol>

      <h2>
        So the question is, why is that second call being made to the API?
      </h2>
    </>
  );
};

export default HomePage;
