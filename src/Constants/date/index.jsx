
  const date = new Date()
  const pad=(n)=>{
      return n<10 ? '0'+n : n
  }
  const day = pad(date.getDate())
  const month = pad(date.getMonth()+1)
  const year = date.getFullYear()
  const hour = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  export const Time = `${day}:${month}:${year}, ${hour}:${minutes}`