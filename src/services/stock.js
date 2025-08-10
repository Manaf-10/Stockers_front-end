import { data } from 'react-router-dom'
import Client from './api'

export const getStock = async (symbol) => {
  try {
    const response = await Client.get(`/stocks/${symbol}`)
    console.log(response)

    const arr = []
    const dates = []

    for (let i = 1; i <= 12; i++) {
      let month = String(i).padStart(2, '0')
      for (let j = 1; j <= 31; j++) {
        let day = String(j).padStart(2, '0')
        if (
          response['Time Series (Daily)'][`2025-${month}-${day}`]?.[
            '4. close'
          ] !== undefined
        ) {
          dates.push(`2025-${month}-${day}`)
          arr.push(
            response['Time Series (Daily)'][`2025-${month}-${day}`]?.[
              '4. close'
            ]
          )
        }
      }
    }
    // console.log('dates: ' + dates)
    // console.log('data: ' + arr)
    return {
      Dates: dates,
      data: arr
    }
  } catch (error) {
    console.log(error)
  }
}

// const arr = []
// const dates = []

// for (let i = 1; i <= 12; i++) {
//   let month = String(i).padStart(2, '0')
//   for (let j = 1; j <= 31; j++) {
//     let day = String(j).padStart(2, '0')
//     if (
//       temp['Time Series (Daily)'][`2025-${month}-${day}`]?.['4. close'] !==
//       undefined
//     ) {
//       dates.push(`2025-${month}-${day}`)
//       arr.push(
//         temp['Time Series (Daily)'][`2025-${month}-${day}`]?.['4. close']
//       )
//     }
//   }
// }
