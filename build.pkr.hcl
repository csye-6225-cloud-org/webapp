variable "gcp_service_acc_key" {
  type    = string
  default = "${env("GCP_SECURITY_CREDENTIALS")}"
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
  image_name          = "csye-6225-image-{{timestamp}}"
  project_id          = "csye-6225-project-dev"
  source_image_family = "centos-stream-8"
  ssh_username        = "pkr-gcp-user"
  // credentials_json    = "${var.gcp_service_acc_key}"
  // credentials_file = "/Users/anuraag/Documents/work/sem2/cloud/csye-6225-project-dev-8c8171073ad4.json"
  credentials_file = "gcp-creds.json"
  network          = "default"
  region           = "us-east1"
  zone             = "us-east1-b"
  // machine_type = "e2-medium"
}

build {
  sources = ["sources.googlecompute.packer-image"]
  provisioner "file" {
    source      = "webapp.zip"
    destination = "~/"
  }
  provisioner "shell" {
    inline = [
      "cd ~"
    ]
  }
  provisioner "shell" {
    scripts = [
      "./build.sh",
    ]
  }
}
