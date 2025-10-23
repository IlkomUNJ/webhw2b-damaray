'use strict'

class ServicesController {
  constructor () {
    this.services = [
      { id: 'wedding', title: 'Wedding', price: 850000 },
      { id: 'portrait', title: 'Portrait', price: 250000 },
      { id: 'event', title: 'Event Documentation', price: 400000 },
      { id: 'product', title: 'Product Photography', price: 350000 },
      { id: 'graduation', title: 'Graduation', price: 300000 }
    ]
  }

  async index({ view, request }) {
    const q = (request.input('q') || '').toLowerCase()
    let filtered = this.services

    if (q) {
      filtered = this.services.filter(s =>
        s.title.toLowerCase().includes(q) || s.id.includes(q)
      )
    }

    const formatted = filtered.map(s => ({
      ...s,
      formattedPrice: 'Rp' + s.price.toLocaleString('id-ID')
    }))
    
    return view.render('index', { services: formatted, query: q })
  }
}

module.exports = ServicesController
