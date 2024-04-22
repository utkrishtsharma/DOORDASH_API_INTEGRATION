import DoorDashClient from '@doordash/sdk';
const client = new DoorDashClient.DoorDashClient( {
    "developer_id": "8c09e57e-aa33-4f43-9a7a-b5660cad581460",
    "key_id": "19049875-a1c3-40f9-b338-d042caf1ae07",
    "signing_secret": "qooAbChQBZKXNrIoWZqhFOfzBFXS4DVst3C370uBgmc"
})

const response = client
  .createDelivery({
    external_delivery_id: 'D-123456',
    pickup_address: '1000 4th Ave, Seattle, WA, 98104',
    pickup_phone_number: '+16505555555',
    dropoff_address: '1202 3rd Ave, Seattle, WA, 98101',
    dropoff_phone_number: '+16505555575',
    tip : 599
  })
  .then(response => {
    console.log(response.data)
  })
  .catch(err => {
    console.log(err)
  })