import { collection, getDocs } from 'firebase/firestore';
import { db } from '../admin/lib/firebase';

export async function getDeletedCatalogIds(
  collectionName: 'tours' | 'destinations'
): Promise<Set<string>> {
  const snapshot = await getDocs(collection(db, collectionName));
  const deletedIds = new Set<string>();

  snapshot.docs.forEach((catalogDoc) => {
    const data = catalogDoc.data();
    if (data.status !== 'Deleted') return;

    deletedIds.add(catalogDoc.id);
    if (typeof data.slug === 'string') deletedIds.add(data.slug);
  });

  return deletedIds;
}
