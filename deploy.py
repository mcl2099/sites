#!/usr/bin/env python3
"""
PlayViral / Marcelo Web Designer — Automated FTP Deployment Script
Faz deploy automático de páginas de clientes para hospedagem Hostinger via FTP em modo passivo.

Uso:
  python deploy.py <slug-do-cliente> [pasta-local]

Exemplos:
  python deploy.py teste-deploy test-page
  python deploy.py proposta-playviral .
  python deploy.py cliente-acme ./dist
"""

import os
import sys
import ftplib
import re
from pathlib import Path

# Configura codificação UTF-8 para o console do Windows
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass


def load_env(env_path=".env"):
    """Carrega variáveis do arquivo .env se existir."""
    env_file = Path(env_path)
    if not env_file.is_file():
        return
    with open(env_file, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
            if "=" in line:
                key, val = line.split("=", 1)
                key = key.strip()
                val = val.strip().strip("'\"")
                if key and key not in os.environ:
                    os.environ[key] = val


def is_ignored(path_str):
    """Verifica se o arquivo ou diretório deve ser ignorado no deploy."""
    ignored_patterns = [
        r"^\.git",
        r"^\.env",
        r"^\.gitignore",
        r"^\.gemini",
        r"^__pycache__",
        r"^node_modules",
        r"\.zip$",
        r"screenshot.*\.png$",
        r"^polished_.*\.png$",
        r"^final_.*\.png$",
        r"^Desktop1920\.jpg$",
        r"^deploy\.py$",
        r"^package.*\.json$",
        r"^test-page$",
        r"^scratch$",
        r"\.DS_Store$",
        r"Thumbs\.db$",
    ]
    parts = Path(path_str).parts
    for part in parts:
        for pat in ignored_patterns:
            if re.search(pat, part, re.IGNORECASE):
                return True
    return False


def make_remote_dir(ftp, dir_path):
    """Cria diretório remoto de forma recursiva se não existir."""
    parts = [p for p in dir_path.replace("\\", "/").split("/") if p]
    current = ""
    if dir_path.startswith("/"):
        current = "/"

    for part in parts:
        current = f"{current}/{part}" if current and current != "/" else f"/{part}"
        try:
            ftp.cwd(current)
        except ftplib.error_perm:
            try:
                ftp.mkd(current)
                ftp.cwd(current)
            except Exception as e:
                # Pode já existir dependendo do retorno do servidor
                pass


def upload_directory(ftp, local_dir, remote_dir):
    """Envia arquivos e pastas locais para o diretório remoto no FTP."""
    local_dir_path = Path(local_dir).resolve()
    if not local_dir_path.exists():
        raise FileNotFoundError(f"Pasta local '{local_dir}' não encontrada.")

    # Garante que o diretório base remoto existe
    make_remote_dir(ftp, remote_dir)

    total_files = 0
    uploaded_files = 0
    total_bytes = 0

    # Coleta lista de arquivos elegíveis
    files_to_upload = []
    if local_dir_path.is_file():
        files_to_upload.append(local_dir_path)
    else:
        for root, dirs, files in os.walk(local_dir_path):
            rel_root = os.path.relpath(root, local_dir_path)
            if rel_root != "." and is_ignored(rel_root):
                dirs[:] = []
                continue

            for file in files:
                rel_file = os.path.normpath(os.path.join(rel_root, file)) if rel_root != "." else file
                if not is_ignored(rel_file):
                    files_to_upload.append((Path(root) / file, rel_file))

    total_files = len(files_to_upload)
    print(f"\n📦 Encontrados {total_files} arquivo(s) para sincronização.")

    for full_local_path, rel_path in files_to_upload:
        rel_posix = Path(rel_path).as_posix()
        remote_file_path = f"{remote_dir.rstrip('/')}/{rel_posix}"
        remote_file_dir = os.path.dirname(remote_file_path)

        # Garante pasta remota
        make_remote_dir(ftp, remote_file_dir)
        ftp.cwd(remote_file_dir)

        filename = os.path.basename(remote_file_path)
        file_size = full_local_path.stat().st_size
        total_bytes += file_size

        uploaded_files += 1
        print(f"  [{uploaded_files}/{total_files}] ⬆️  {rel_posix} ({file_size / 1024:.1f} KB)")

        with open(full_local_path, "rb") as f:
            ftp.storbinary(f"STOR {filename}", f)

    return total_files, total_bytes


def main():
    load_env()

    if len(sys.argv) < 2:
        print("=" * 60)
        print("  PLAYVIRAL / MARCELO WEB DESIGNER — FTP DEPLOY")
        print("=" * 60)
        print("Uso:")
        print("  python deploy.py <slug-do-cliente> [pasta-local]")
        print("\nExemplos:")
        print("  python deploy.py teste-deploy test-page")
        print("  python deploy.py cliente-acme .")
        print("=" * 60)
        sys.exit(1)

    slug = sys.argv[1].strip().lower()
    # Normaliza slug (apenas letras, números, hífen)
    slug = re.sub(r"[^a-z0-9\-_]", "-", slug).strip("-")
    if not slug:
        print("❌ Erro: O slug informado é inválido.")
        sys.exit(1)

    local_path = sys.argv[2] if len(sys.argv) > 2 else "."

    ftp_host = os.environ.get("FTP_HOST", "82.25.67.235")
    ftp_port = int(os.environ.get("FTP_PORT", 21))
    ftp_user = os.environ.get("FTP_USER", "u990851286")
    ftp_pass = os.environ.get("FTP_PASS", "")
    ftp_base_dir = os.environ.get("FTP_BASE_DIR", "/public_html").rstrip("/")
    public_base_url = os.environ.get("PUBLIC_BASE_URL", "https://www.marcelowebdesigner.com.br").rstrip("/")

    if not ftp_pass:
        print("❌ Erro: FTP_PASS não definido no arquivo .env ou nas variáveis de ambiente.")
        sys.exit(1)

    remote_client_dir = f"{ftp_base_dir}/{slug}"
    public_url = f"{public_base_url}/{slug}/"

    print("=" * 60)
    print("🚀 INICIANDO DEPLOY AUTOMÁTICO VIA FTP (MODO PASSIVO)")
    print("=" * 60)
    print(f"• Servidor FTP : {ftp_host}:{ftp_port}")
    print(f"• Usuário      : {ftp_user}")
    print(f"• Pasta Local  : {Path(local_path).resolve()}")
    print(f"• Pasta Remota : {remote_client_dir}")
    print(f"• URL Destino  : {public_url}")
    print("=" * 60)

    try:
        print("\n⏳ Conectando ao servidor FTP...")
        ftp = ftplib.FTP()
        ftp.connect(ftp_host, ftp_port, timeout=15)
        ftp.login(ftp_user, ftp_pass)
        ftp.set_pasv(True)
        print("✅ Conectado com sucesso em modo passivo!")

        count, bytes_sent = upload_directory(ftp, local_path, remote_client_dir)

        ftp.quit()
        print("\n" + "=" * 60)
        print("🎉 DEPLOY CONCLUÍDO COM SUCESSO!")
        print(f"• Total enviado : {count} arquivo(s) ({bytes_sent / (1024*1024):.2f} MB)")
        print(f"• Link público  : {public_url}")
        print("=" * 60 + "\n")

    except Exception as e:
        print(f"\n❌ Erro durante o deploy: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
