import React, { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Modal from "./components/Modal";
import { ToastProvider, useToast } from "./components/ToastContext";

function Demo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});

  const { addToast } = useToast();

  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setModalOpen(false);
      addToast("User saved successfully", "success");
    }, 1500);
  };

  return (
    <div style={{ padding: 40 }}>

      <Input
        label="Name"
        placeholder="Enter name"
        value={form.name}
        error={errors.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <Input
        label="Email"
        placeholder="Enter email"
        value={form.email}
        error={errors.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Open Modal
        </Button>

        <Button
          variant="primary"
          onClick={() => addToast("Success message", "success")}
        >
          Success Toast
        </Button>

        <Button
          variant="secondary"
          onClick={() => addToast("Info message", "info")}
        >
          Info Toast
        </Button>

        <Button
          variant="danger"
          onClick={() => addToast("Something went wrong", "error")}
        >
          Error Toast
        </Button>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create User"
        footer={
          <>
            <Button onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              loading={loading}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </>
        }
      >
        <Input
          label="Name"
          placeholder="Enter name"
          value={form.name}
          error={errors.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <Input
          label="Email"
          placeholder="Enter email"
          value={form.email}
          error={errors.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  );
}