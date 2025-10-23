'use strict'

class CartController {
  async add({ request, response, session }) {
    const serviceId = request.input('service')
    const ALL_SERVICES = [
      { id: 'wedding', title: 'Wedding', price: 850000 },
      { id: 'portrait', title: 'Portrait', price: 250000 },
      { id: 'event', title: 'Event Documentation', price: 400000 },
      { id: 'product', title: 'Product Photography', price: 350000 },
      { id: 'graduation', title: 'Graduation', price: 300000 }
    ]

    const svc = ALL_SERVICES.find(s => s.id === serviceId)
    if (!svc) {
      session.flash({ error: 'Jasa tidak ditemukan!' })
      return response.redirect('back')
    }

    const cart = session.get('cart', [])
    cart.push(svc)
    session.put('cart', cart)
    session.flash({ success: `${svc.title} ditambahkan ke keranjang.` })
    return response.redirect('back')
  }

  async show({ view, session }) {
    const cart = session.get('cart', [])
    const total = cart.reduce((acc, it) => acc + (it.price || 0), 0)
    const formattedCart = cart.map(it => ({
      ...it,
      formattedPrice: 'Rp' + it.price.toLocaleString('id-ID')
    }))
    const formattedTotal = 'Rp' + total.toLocaleString('id-ID')
    return view.render('cart', { cart: formattedCart, total: formattedTotal })
    
  }

  async remove({ request, response, session }) {
    const index = Number(request.input('index'))
    let cart = session.get('cart', [])
    if (!isNaN(index) && cart[index]) cart.splice(index, 1)
    session.put('cart', cart)
    return response.redirect('/cart')
  }

  async clear({ response, session }) {
    session.put('cart', [])
    return response.redirect('/cart')
  }
}

module.exports = CartController
