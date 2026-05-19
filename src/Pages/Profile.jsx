import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.js';
import { Loader2, CheckCircle2, AlertCircle, ImageIcon, Building2, User, Pencil } from 'lucide-react';

export default function Profile({ user }) {
  const [formData, setFormData] = useState({
    full_name: '',
    member_type: '',
    workplace: '',
    department: '',
    role: '',
    avatar_url: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [crop, setCrop] = useState({ zoom: 1, x: 50, y: 50 });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const avatarBucket = import.meta.env.VITE_SUPABASE_AVATAR_BUCKET || 'avatars';

  useEffect(() => {
    if (!user) return;

    setFormData({
      full_name: user.user_metadata?.full_name || '',
      member_type: user.user_metadata?.member_type || '',
      workplace: user.user_metadata?.workplace || '',
      department: user.user_metadata?.department || '',
      role: user.user_metadata?.role || '',
      avatar_url: user.user_metadata?.avatar_url || '',
    });
    setAvatarPreview(user.user_metadata?.avatar_url || '');
    setAvatarFile(null);
    setCrop({ zoom: 1, x: 50, y: 50 });
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setStatus({ type: 'error', message: 'Please select a valid image file.' });
      setAvatarFile(null);
      setAvatarPreview(formData.avatar_url || '');
      return;
    }

    if (file.size === 0) {
      setStatus({ type: 'error', message: 'The selected image is empty. Please choose a different file.' });
      setAvatarFile(null);
      setAvatarPreview(formData.avatar_url || '');
      return;
    }

    setStatus({ type: '', message: '' });
    setAvatarFile(file);
    setFormData((prev) => ({ ...prev, avatar_url: '' }));
    setCrop({ zoom: 1, x: 50, y: 50 });
    setAvatarPreview(URL.createObjectURL(file));
  };

  const uploadAvatarFile = async (file) => {
    if (!file || !user) return null;

    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(avatarBucket)
      .upload(filePath, file, { cacheControl: '3600', upsert: true });

    if (uploadError) {
      const lowerMessage = uploadError.message?.toLowerCase() || '';
      if (/bucket/i.test(uploadError.message) || uploadError.status === 404) {
        throw new Error(`Supabase storage bucket "${avatarBucket}" not found. Create this bucket in your Supabase project or update VITE_SUPABASE_AVATAR_BUCKET in .env.`);
      }
      if (/row-level security|policy|permission denied/i.test(lowerMessage)) {
        throw new Error(`Upload blocked by storage policy. Verify storage RLS policies for bucket "${avatarBucket}" and allow authenticated users to insert objects.`);
      }
      throw uploadError;
    }

    const { data } = supabase.storage.from(avatarBucket).getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const updateData = {
        full_name: formData.full_name,
        member_type: formData.member_type,
        workplace: formData.workplace,
        department: formData.department,
        role: formData.role,
      };

      if (avatarFile) {
        const uploadedUrl = await uploadAvatarFile(avatarFile);
        updateData.avatar_url = uploadedUrl;
        setFormData((prev) => ({ ...prev, avatar_url: uploadedUrl }));
        setAvatarPreview(uploadedUrl);
      } else {
        updateData.avatar_url = formData.avatar_url;
      }

      const { error } = await supabase.auth.updateUser({ data: updateData });
      if (error) throw error;
      setStatus({ type: 'success', message: 'Profile updated successfully.' });
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Unable to update profile.' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex-grow flex items-center justify-center bg-[#f8fafc] py-20 px-4">
        <div className="max-w-xl w-full rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <User className="mx-auto mb-4 h-12 w-12 text-[#00a8e8]" />
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Sign in to manage your profile</h2>
          <p className="text-slate-500">Your profile page is only available after you log in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-[#f8fafc] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#00a8e8] mb-3">Member Profile</p>
            <h1 className="text-4xl font-black text-[#041124]">Update your profile</h1>
            <p className="text-slate-600 mt-3 max-w-2xl">
              Change your display name, workplace details, member category, and optional profile avatar link.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
              {avatarPreview ? (
                <img src={avatarPreview} alt="avatar preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-2xl font-black text-[#041124]">
                  {formData.full_name?.charAt(0) || user.email.charAt(0)}
                </span>
              )}
            </div>
            <div>
              <p className="font-semibold text-slate-900">Signed in as</p>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>
        </div>

        {status.message && (
          <div className={`mb-6 rounded-2xl border px-4 py-3 text-sm ${status.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
            {status.type === 'success' ? <CheckCircle2 className="inline h-4 w-4 mr-2 align-text-bottom" /> : <AlertCircle className="inline h-4 w-4 mr-2 align-text-bottom" />}
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-[1fr_320px]">
          <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-2">
              <label htmlFor="full_name" className="text-sm font-semibold text-slate-700">Full Name</label>
              <input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#00a8e8] focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="member_type" className="text-sm font-semibold text-slate-700">Member Type</label>
              <input
                id="member_type"
                name="member_type"
                value={formData.member_type}
                onChange={handleInputChange}
                placeholder="Student, Ordinary, Corporate..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#00a8e8] focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="workplace" className="text-sm font-semibold text-slate-700">Workplace / Organization</label>
              <input
                id="workplace"
                name="workplace"
                value={formData.workplace}
                onChange={handleInputChange}
                placeholder="e.g. University of Colombo"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#00a8e8] focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="department" className="text-sm font-semibold text-slate-700">Department</label>
              <input
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="e.g. Industrial Engineering"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#00a8e8] focus:bg-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-semibold text-slate-700">Role / Title</label>
              <input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="e.g. Data Analyst"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#00a8e8] focus:bg-white"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-[#e2f2ff] p-3 text-[#0b61a7]">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">Profile picture</h2>
                  <p className="text-sm text-slate-500">Upload a file or paste an image URL for your profile avatar.</p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <label className="block text-sm font-semibold text-slate-700">Upload photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition file:mr-4 file:rounded-full file:border-0 file:bg-[#e2f8ff] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-900"
                />

                <label className="block text-sm font-semibold text-slate-700">Or avatar URL</label>
                <input
                  id="avatar_url"
                  name="avatar_url"
                  value={formData.avatar_url}
                  onChange={(event) => {
                    handleInputChange(event);
                    setAvatarFile(null);
                    setAvatarPreview(event.target.value);
                    setCrop({ zoom: 1, x: 50, y: 50 });
                  }}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#00a8e8] focus:bg-white"
                />
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-950 p-4 text-white shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Preview & crop</p>
                    <p className="text-xs text-slate-400">Use zoom and position controls to preview the avatar crop.</p>
                  </div>
                </div>
                <div className="relative mb-4 h-56 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar preview"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{
                        objectPosition: `${crop.x}% ${crop.y}%`,
                        transform: `scale(${crop.zoom})`,
                        transition: 'transform 0.2s ease, object-position 0.2s ease',
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      No preview available
                    </div>
                  )}
                </div>

                <div className="space-y-4 text-slate-300">
                  <div>
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-500 mb-2">Zoom</div>
                    <input
                      type="range"
                      min="1"
                      max="2"
                      step="0.01"
                      value={crop.zoom}
                      onChange={(event) => setCrop((prev) => ({ ...prev, zoom: Number(event.target.value) }))}
                      className="w-full accent-[#00a8e8]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-500 mb-2">Horizontal position</div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={crop.x}
                      onChange={(event) => setCrop((prev) => ({ ...prev, x: Number(event.target.value) }))}
                      className="w-full accent-[#00a8e8]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-slate-500 mb-2">Vertical position</div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={crop.y}
                      onChange={(event) => setCrop((prev) => ({ ...prev, y: Number(event.target.value) }))}
                      className="w-full accent-[#00a8e8]"
                    />
                  </div>
                </div>
              </div>
            </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-[#eaf8f9] p-3 text-[#0c6d58]">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">Profile summary</h2>
                  <p className="text-sm text-slate-500">Your saved metadata will appear in the profile dropdown and can be used for member verification.</p>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <p><span className="font-semibold text-slate-900">Name:</span> {formData.full_name || 'Not set'}</p>
                <p><span className="font-semibold text-slate-900">Workplace:</span> {formData.workplace || 'Not set'}</p>
                <p><span className="font-semibold text-slate-900">Department:</span> {formData.department || 'Not set'}</p>
                <p><span className="font-semibold text-slate-900">Role:</span> {formData.role || 'Not set'}</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#00a8e8] px-5 py-3 text-white font-semibold transition hover:bg-[#0090c7] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Saving changes...
                </>
              ) : (
                <>
                  <Pencil className="h-4 w-4" /> Save profile updates
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
