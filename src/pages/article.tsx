import { CONFIG } from 'src/config-global';

import ArticleDashboard from 'src/sections/article/view/articleDashboard';


// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Article - ${CONFIG.appName}`}</title>

      <ArticleDashboard />
    </>
  );
}
