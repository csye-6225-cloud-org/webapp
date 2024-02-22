variable "gcp_service_acc_key" {
  type    = string
  default = "${env("GCP_DEV_ACC_KEY")}"
}

packer {
  required_plugins {
    googlecompute = {
      source  = "github.com/hashicorp/googlecompute"
      version = ">= 1, <2"
    }
  }
}

source "googlecompute" "packer-image" {
  project_id          = "csye-6225-project-dev"
  source_image_family = "centos-stream-8"
  ssh_username        = "pkr-gcp-user"
  // credentials_json = "${var.gcp_service_acc_key}"
    credentials_file = "/Users/anuraag/Documents/work/sem2/cloud/csye-6225-project-dev-8c8171073ad4.json"

  region = "us-east1"
  zone  = "us-east1-b"
    // instance_type = "e2-medium"
}

build {
  sources = ["sources.googlecompute.packer-image"]
  provisioner "shell" {
    inline = [
        "echo Hi World!"
      ]
  }
  //   provisioner "file" {
  //   source = "webapp.zip"
  //   destination = "~/"
  // }
  //   provisioner "shell" {
  //   inline = [
  //     "cd ~",
  //     "sudo mkdir -v -m755 webservice",
  //     "sudo unzip webservice.zip -d webservice"
  //   ]
  // }
  //   provisioner "shell" {
  //   // environment_vars = ["CURRENTREGION=${var.ami_region}"]
  //   scripts = [
  //     "./buildscript.sh",
  //   ]
  // }
}
