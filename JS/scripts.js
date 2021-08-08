const d = document,
  $main = d.querySelector("main"),
  $files = d.getElementById("files");

const uploader = (file) => {
  const xhr = new XMLHttpRequest(),
    formData = new FormData();

  formData.append("file", file); //Sirve para crear un formulario de manera dinamica

  xhr.addEventListener("readystatechange", (e) => {
    if (xhr.readyState !== 4) return;
    if (xhr.status >= 200 && xhr.status < 300) {
      // let json = JSON.parse(xhr.responseText);
      // console.log(json);
    } else {
      let message = xhr.statusText || "Ocurrio un error";
      console.error(`Error ${xhr.status}: ${message}`);
    }
  });

  xhr.open("POST", "PHP/uploader.php");
  xhr.setRequestHeader("enc-type", "multipart/form.data"); //Cabecera para el envio
  xhr.send(formData);
};

const progressUpload = (file) => {
  const $progress = d.createElement("progress"),
    $span = d.createElement("span");

  $progress.value = 0;
  $progress.max = 100;

  $main.insertAdjacentElement("beforeend", $progress);
  $main.insertAdjacentElement("beforeend", $span);

  const fileRedaer = new FileReader(); //Permite detectar los bits que se han cargado
  fileRedaer.readAsDataURL(file);

  fileRedaer.addEventListener("progress", (e) => {
    let progress = parseInt((e.loaded * 100) / e.total);
    $progress.value = progress;
    $span.innerHTML = `<b> ${file.name} - ${progress}%</b>`;
  });

  fileRedaer.addEventListener("loadend", (e) => {
    uploader(file);
    setTimeout(() => {
      $main.removeChild($progress);
      $main.removeChild($span);
      $files.value = "";
    }, 3000);
  });
};

d.addEventListener("change", (e) => {
  if (e.target === $files) {
    const file = Array.from(e.target.files); //Almacena los archivos en un arreglo
    file.forEach((el) => progressUpload(el));
  }
});
