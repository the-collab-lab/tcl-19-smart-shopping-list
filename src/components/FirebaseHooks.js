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
      <p>
        {error && <strong>Error: {JSON.stringify(error)}</strong>}
        {loading && <span>Collection: Loading...</span>}
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
