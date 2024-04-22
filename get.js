import DoorDashClient from '@doordash/sdk';

const client = new DoorDashClient.DoorDashClient( {
    "developer_id": "b148ecaf-b0a9-47ca-8a7d-a810c407dbb8",
    "key_id": "19049875-a1c3-40f9-b338-d042caf1ae07",
    "signing_secret": "qooAbChQBZKXNrIoWZqhFOfzBFXS4DVst3C370uBgmc"
})


// Assuming there is a method to get delivery details
client.getDelivery('D-123469')
  .then(response => {
    console.log(response.data);
  })
  .catch(err => {
    console.log(err);
  });
