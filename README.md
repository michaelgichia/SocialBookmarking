
<details>
<summary>Dashboard Source Code</summary>

```jsx
import React from 'react';
import AuthRequired from './AuthRequired';

class Dashboard extends React.Component {

  render() {
    return (
      <div className="page-wrapper">
        <h1>DASHBOARD</h1>
        <h4>This page is protect and only authorized users can view it.</h4>
      </div>
    );
  }
}
export default AuthRequired(Dashboard);
```
</details>
