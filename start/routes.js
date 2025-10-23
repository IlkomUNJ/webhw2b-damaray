'use strict'

const Route = use('Route')

// Halaman utama
Route.get('/', 'ServicesController.index')

// Halaman statis
Route.on('/about').render('about')
Route.on('/portofolio').render('portofolio')
Route.on('/privacy').render('privacy')

// Keranjang
Route.post('/cart/add', 'CartController.add')
Route.get('/cart', 'CartController.show')
Route.post('/cart/remove', 'CartController.remove')
Route.post('/cart/clear', 'CartController.clear')
