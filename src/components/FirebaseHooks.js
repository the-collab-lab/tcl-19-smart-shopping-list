import React from 'react';
import firebase from '../lib/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const FirestoreCollection = () => {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('hooks'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );
  return (
    <div>
      {loading === true ? <p> Loading... </p> : null}
      {error === undefined ? null : <p> An error has occurred! </p>}
      <p>
        {value && (
          <span>
            Collection:{' '}
            {value.docs.map((doc) => (
              <React.Fragment key={doc.id}>
                {JSON.stringify(doc.data())},{' '}
              </React.Fragment>
            ))}
          </span>
        )}
      </p>
    </div>
  );
};

export default FirestoreCollection;
