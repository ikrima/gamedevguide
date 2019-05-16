#### **Threads:**

Get Current Thread ID:

- FPlatformTLS::GetCurrentThreadId()

Deal with Thread Local Storage/TLS: FGenericPlatformTLS()

- Provides allocation, deallocation, etc

- TlsSlot = FPlatformTLS::AllocTlsSlot()

- Reinterpret_cast&lt;bla\*>(FPlatformTLS::GetTlsValue(TlsSlot))

- FPlatformTLS::SetTlsValue(TlsSlot, bladata);
