import firebase from "./firebase";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

const db = getFirestore(firebase);

var headers = new Headers();
headers.append("Content-Type", "application/json");

var requestOptions = {
  method: "POST",
  headers: headers,
  redirect: "follow",
};

var body = {
  username: "dublincityapi",
  password: "Xpa5vAQ9ki",
};

export const saveMonitors = async () => {
  await deleteCollection(db, "monitors");

  fetch("https://data.smartdublin.ie/sonitus-api/api/monitors", {
    ...requestOptions,
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((res) => {
      res.forEach(async (item) => {
        try {
          const monitorsRef = collection(db, "monitors");
          await addDoc(monitorsRef, item);
        } catch (e) {
          console.log(e);
        }
      });
    });
};

export const saveMonitorData = async (serial_number, start, end) => {
  await deleteCollection(db, serial_number);

  fetch("https://data.smartdublin.ie/sonitus-api/api/data", {
    ...requestOptions,
    body: JSON.stringify({
      ...body,
      monitor: serial_number,
      start: start,
      end: end,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      res.forEach(async (item) => {
        try {
          const serialRef = collection(db, serial_number);
          await addDoc(serialRef, item);
        } catch (e) {
          console.log(e);
        }
      });
    });
};

export const getMonitors = async () => {
  const monitorsCollRef = collection(db, "monitors");
  const data = await getDocs(monitorsCollRef);
  return data.docs.map((doc) => ({ ...doc.data() }));
};

export const getMonitorData = async (serial_number) => {
  const monitorDataCollRef = collection(db, serial_number);
  const data = await getDocs(monitorDataCollRef);
  return data.docs.map((doc) => ({ ...doc.data() }));
};

export const saveData = async (start, end) => {
  await saveMonitors();

  let monitors = await getMonitors();

  const promises = monitors.map(async (m) => {
    if (m.label.split(" ")[0] !== "Noise" || m.location === "In Office") {
      return;
    }

    saveMonitorData(m.serial_number, start, end);
  });
  await Promise.all(promises);

  return monitors;
};

export const getData = async (start, end) => {
  let monitors = await saveData(start, end);
  let data = {};

  const promises = monitors.map(async (m) => {
    const serialCollRef = collection(db, m.serial_number);
    const monitorData = (await getDocs(serialCollRef)).docs.map((doc) => ({
      ...doc.data(),
    }));

    var monitorReadings = monitorData.map((r) => {
      const [dateValues, timeValues] = r.datetime.split(" ");
      const [year, month, day] = dateValues.split("-");
      const [hours, minutes, seconds] = timeValues.split(":");

      return {
        datetime: new Date(
          +year,
          +month - 1,
          +day,
          +hours,
          +minutes,
          +seconds
        ).getTime(),
        laeq: r.laeq,
      };
    });

    data[m.serial_number] = {
      label: m.label,
      location: m.location,
      data: monitorReadings,
    };
  });
  await Promise.all(promises);

  return data;
};

const deleteCollection = async (db, collectionName) => {
  const querySnapshot = await getDocs(query(collection(db, collectionName)));

  const promises = [];
  querySnapshot.forEach((doc) => {
    promises.push(deleteDoc(doc.ref));
  });

  await Promise.all(promises);
};
