const btn = document.getElementById('button');

document.getElementById('form')
  .addEventListener('submit', function(event) {
  event.preventDefault();
    
  btn.value = 'Sending...';
 
  const serviceID = 'default_service';
  const templateID = 'template_1nezi1q';
 
  const formData = new FormData(this);
  formData.append('carrito', JSON.stringify(carritoGuardado));
 
  emailjs.sendForm(serviceID, templateID, this)
  .then(() => {
    btn.value = 'Confirmar Pedido';
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Pedido enviado con exito",
      text: "Recibiras un email para coordinar!",
      showCloseButton: true,
    });
    }, (err) => {
    btn.value = 'Confirmar Pedido';
    alert(JSON.stringify(err));
  });
});