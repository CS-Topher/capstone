import React, { useContext, Fragment } from "react";
import { UserContext } from 'data/UserStore';

const ListsView = () => {
  const [state, dispatch] = useContext(UserContext);

  return (
    <Fragment>
      <h1>Lists</h1>
    </Fragment>
  );
}

export default ListsView;
